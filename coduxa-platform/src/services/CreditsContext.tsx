import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { supabase } from "../components/lib/supabaseClient";
import { getUserCredits } from "./creditsService.ts";

type CreditsContextValue = {
  credits: number;
  setCredits: (value: number) => void;
  refresh: () => Promise<void>;
  userId?: string;
};

const CreditsContext = createContext<CreditsContextValue | undefined>(undefined);

export function CreditsProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [credits, setCredits] = useState<number>(0);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getUser();
      const currentUserId = data.user?.id;
      setUserId(currentUserId);
      if (currentUserId) {
        const value = await getUserCredits(currentUserId);
        setCredits(value);
      }
    };
    load();
  }, []);

  const refresh = async () => {
    if (!userId) return;
    const value = await getUserCredits(userId);
    setCredits(value);
  };

  const value = useMemo<CreditsContextValue>(() => ({ credits, setCredits, refresh, userId }), [credits, userId]);

  return <CreditsContext.Provider value={value}>{children}</CreditsContext.Provider>;
}

export function useCredits(): CreditsContextValue {
  const ctx = useContext(CreditsContext);
  if (!ctx) throw new Error("useCredits must be used within a CreditsProvider");
  return ctx;
}
