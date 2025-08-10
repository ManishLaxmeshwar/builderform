import React, { useEffect } from 'react';
import { Container, Typography, List, ListItemButton, ListItemText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { loadFormsFromLocalStorage, setCurrentForm } from '../store/formSlice';
import { RootState } from '../store/store';
import { useNavigate } from 'react-router-dom';

export default function MyFormsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formsList = useSelector((state: RootState) => state.form.formsList);

  useEffect(() => {
    dispatch(loadFormsFromLocalStorage());
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        My Forms
      </Typography>
      <List>
        {formsList.length === 0 && (
          <Typography>No forms saved yet. Go to Create page to make one.</Typography>
        )}
        {formsList.map((form) => (
          <ListItemButton
            key={form.id}
            onClick={() => {
              dispatch(setCurrentForm(form));
              navigate(`/preview/${form.id}`);
            }}
          >
            <ListItemText
              primary={form.name}
              secondary={new Date(form.createdAt).toLocaleString()}
            />
          </ListItemButton>
        ))}
      </List>
    </Container>
  );
}
