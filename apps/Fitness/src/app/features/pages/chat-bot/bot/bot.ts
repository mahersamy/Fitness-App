import {
    Component,
    signal,
    inject,
    DestroyRef,
    ViewChild,
    ElementRef,
    AfterViewChecked,
    OnInit,
} from "@angular/core";
import {TranslatePipe} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";
import {MainButton} from "./../../../../shared/components/ui/main-button/main-button";
import {
    GeminiIntegration,
    ChatMessage,
    ChatSession,
} from "../../../../core/services/gemini-int/gemini-integration";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Translation} from "../../../../core/services/translation/translation";

@Component({
    selector: "app-bot",
    imports: [MainButton, TranslatePipe, FormsModule],
    templateUrl: "./bot.html",
    styleUrl: "./bot.scss",
})
export class Bot implements AfterViewChecked, OnInit {
    @ViewChild("chatContainer") private chatContainer?: ElementRef;

    private gemini = inject(GeminiIntegration);
    private destroyRef = inject(DestroyRef);
    private translation = inject(Translation);

    chatMessage = "";
    isActiveChat = signal<boolean>(false);
    messages = signal<ChatMessage[]>([]);
    isStreaming = signal<boolean>(false);
    chatHistory = signal<ChatSession[]>([]);
    isSidebarOpen = signal<boolean>(false);
    private shouldScroll = false;

    ngOnInit() {
        this.chatHistory.set(this.gemini.allChatSessions());
    }

    ngAfterViewChecked() {
        if (this.shouldScroll) {
            this.scrollToBottom();
            this.shouldScroll = false;
        }
    }

    openChat() {
        this.isActiveChat.update((v) => !v);
    }

    sendMessage() {
        const message = this.chatMessage.trim();
        if (!message || this.isStreaming()) return;

        // Add user message immediately
        this.messages.update((m) => [...m, {role: "user", text: message}]);
        this.chatMessage = "";
        this.shouldScroll = true;

        // Prepare for model response
        let modelIndex = -1;
        this.messages.update((m) => {
            modelIndex = m.length;
            return [...m, {role: "model", text: ""}];
        });

        this.isStreaming.set(true);

        this.gemini
            .sendMessage$(message)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (chunk) => {
                    this.messages.update((m) => {
                        const updated = [...m];
                        updated[modelIndex] = {
                            ...updated[modelIndex],
                            text: chunk,
                        };
                        return updated;
                    });
                    this.shouldScroll = true;
                },
                complete: () => {
                    this.isStreaming.set(false);
                },
                error: () => {
                    this.isStreaming.set(false);
                },
            });
    }

    toggleSidebar() {
        this.isSidebarOpen.update((value) => !value);
    }

    loadSession(id: number) {
        if (this.gemini.loadSession(id)) {
            this.messages.set([...this.gemini.currentHistory()]);
            this.shouldScroll = true;
        }
    }

    deleteSession(id: number) {
        this.gemini.deleteSession(id);
        this.chatHistory.set(this.gemini.allChatSessions());
    }

    resetChat() {
        this.gemini.resetConversation();
        this.messages.set([]);
    }

    private scrollToBottom(): void {
        if (this.chatContainer) {
            const element = this.chatContainer.nativeElement;
            element.scrollTop = element.scrollHeight;
        }
    }
}
