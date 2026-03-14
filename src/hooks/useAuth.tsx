import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  role: 'super_admin' | 'branch_admin' | null;
  branchId: string | null;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<'super_admin' | 'branch_admin' | null>(null);
  const [branchId, setBranchId] = useState<string | null>(null);

  const fetchRole = async (userId: string) => {
    const { data } = await supabase
      .from('user_roles')
      .select('role, branch_id')
      .eq('user_id', userId)
      .maybeSingle();
    if (data) {
      setRole(data.role as 'super_admin' | 'branch_admin');
      setBranchId(data.branch_id);
    } else {
      setRole(null);
      setBranchId(null);
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchRole(session.user.id).catch(() => {
            setRole(null);
            setBranchId(null);
          }).finally(() => setLoading(false));
        } else {
          setRole(null);
          setBranchId(null);
          setLoading(false);
        }
      }
    );

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchRole(session.user.id).catch(() => {
          setRole(null);
          setBranchId(null);
        });
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setRole(null);
    setBranchId(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, role, branchId, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    return { user: null, session: null, loading: true, role: null, branchId: null, signIn: async () => ({ error: null }), signOut: async () => {} } as AuthContextType;
  }
  return ctx;
};
