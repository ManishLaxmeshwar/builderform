// src/store/formSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { FormSchema, FormField } from '../types/form';

export interface FormState {
  formsList: FormSchema[];
  currentForm: FormSchema;
}

const initialState: FormState = {
  formsList: [],
  currentForm: {
    id: uuidv4(),
    name: '',
    createdAt: dayjs().toISOString(),
    fields: [],
  },
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormName: (state, action: PayloadAction<string>) => {
      state.currentForm.name = action.payload;
    },
    addField: (state, action: PayloadAction<FormField>) => {
      state.currentForm.fields.push(action.payload);
    },
    updateField: (state, action: PayloadAction<FormField>) => {
      const idx = state.currentForm.fields.findIndex(f => f.id === action.payload.id);
      if (idx !== -1) {
        state.currentForm.fields[idx] = action.payload;
      }
    },
    deleteField: (state, action: PayloadAction<string>) => {
      state.currentForm.fields = state.currentForm.fields.filter(f => f.id !== action.payload);
    },
    saveFormToLocalStorage: (state) => {
      if (!state.currentForm.name) {
        alert("Please enter a form name before saving.");
        return;
      }
      if (state.currentForm.fields.length === 0) {
        alert("Please add at least one field before saving.");
        return;
      }
      const updatedList = [...state.formsList, state.currentForm];
      state.formsList = updatedList;
      localStorage.setItem('formsList', JSON.stringify(updatedList));

      // Reset currentForm after saving
      state.currentForm = {
        id: uuidv4(),
        name: '',
        createdAt: dayjs().toISOString(),
        fields: [],
      };
    },
    loadFormsFromLocalStorage: (state) => {
      const stored = localStorage.getItem('formsList');
      if (stored) {
        state.formsList = JSON.parse(stored);
      } else {
        state.formsList = [];
      }
    },
    setCurrentForm: (state, action: PayloadAction<FormSchema>) => {
      state.currentForm = action.payload;
    },
  },
});

export const {
  setFormName,
  addField,
  updateField,
  deleteField,
  saveFormToLocalStorage,
  loadFormsFromLocalStorage,
  setCurrentForm,
} = formSlice.actions;

export default formSlice.reducer;
