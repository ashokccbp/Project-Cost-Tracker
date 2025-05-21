import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  serverTimestamp, 
  Timestamp 
} from 'firebase/firestore';
import { db, auth } from '../../firebase/config';
import { OtherCost, OtherCostsState } from '../../types';

const initialState: OtherCostsState = {
  otherCosts: [],
  isLoading: false,
  error: null,
};

export const fetchOtherCosts = createAsyncThunk(
  'otherCosts/fetchOtherCosts',
  async (_, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');
      
      const costsQuery = query(
        collection(db, 'otherCosts'),
        where('userId', '==', user.uid)
      );
      
      const querySnapshot = await getDocs(costsQuery);
      
      const otherCosts: OtherCost[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        otherCosts.push({
          id: doc.id,
          description: data.description,
          amount: data.amount,
          createdAt: data.createdAt.toDate(),
        });
      });
      
      return otherCosts;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addOtherCost = createAsyncThunk(
  'otherCosts/addOtherCost',
  async ({ description, amount }: { description: string; amount: number }, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');
      
      const docRef = await addDoc(collection(db, 'otherCosts'), {
        description,
        amount,
        userId: user.uid,
        createdAt: serverTimestamp(),
      });
      
      return {
        id: docRef.id,
        description,
        amount,
        createdAt: new Date(),
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateOtherCost = createAsyncThunk(
  'otherCosts/updateOtherCost',
  async ({ id, description, amount }: { id: string; description: string; amount: number }, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');
      
      const costRef = doc(db, 'otherCosts', id);
      await updateDoc(costRef, {
        description,
        amount,
      });
      
      return { id, description, amount };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteOtherCost = createAsyncThunk(
  'otherCosts/deleteOtherCost',
  async (id: string, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');
      
      const costRef = doc(db, 'otherCosts', id);
      await deleteDoc(costRef);
      
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const otherCostsSlice = createSlice({
  name: 'otherCosts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Other Costs
      .addCase(fetchOtherCosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOtherCosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.otherCosts = action.payload;
      })
      .addCase(fetchOtherCosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Add Other Cost
      .addCase(addOtherCost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addOtherCost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.otherCosts.push(action.payload);
      })
      .addCase(addOtherCost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update Other Cost
      .addCase(updateOtherCost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateOtherCost.fulfilled, (state, action) => {
        state.isLoading = false;
        const { id, description, amount } = action.payload;
        const index = state.otherCosts.findIndex(cost => cost.id === id);
        if (index !== -1) {
          state.otherCosts[index].description = description;
          state.otherCosts[index].amount = amount;
        }
      })
      .addCase(updateOtherCost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Delete Other Cost
      .addCase(deleteOtherCost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteOtherCost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.otherCosts = state.otherCosts.filter(cost => cost.id !== action.payload);
      })
      .addCase(deleteOtherCost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default otherCostsSlice.reducer;