export interface KeyboardFilterKeySettings {
  enabled: boolean;
  acceptDelayMs: number;
  repeatDelayMs: number;
  repeatRateMs: number;
  bounceDelayMs: number;
  rawFlags: number;
}

export interface KeyboardFilterKeyUpdate {
  enabled?: boolean;
  acceptDelayMs?: number;
  repeatDelayMs?: number;
  repeatRateMs?: number;
  persist?: boolean;
  broadcastChange?: boolean;
}
