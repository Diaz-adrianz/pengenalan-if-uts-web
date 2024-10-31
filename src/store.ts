import { create } from 'zustand';

interface Istate {
  page: string | null;
}

const initialState: Istate = {
  page: null,
};

interface Iaction {
  setPage: (page: string | null) => void;

  clear: () => void;
}

const Store = create<Istate & Iaction>((set) => ({
  ...initialState,
  setPage: (t) => set({ page: t }),
  clear: () => set(initialState),
}));

export default Store;
