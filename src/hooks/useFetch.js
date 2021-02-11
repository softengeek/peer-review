import { useState, useEffect } from 'react';
import { useStore } from '../store/store';
import { ADD_USERS } from '../store/reducer';

export const useFetch = (url, type, setOpen) => {
  const [state, dispatch] = useStore();

  useEffect(() => {
      
    fetch(url)
            .then(response => response.json())
            .then(data => {
                if ((state.users.length === 0 && type === ADD_USERS) || (type !== ADD_USERS)) {
                  dispatch({
                    type,
                    payload: data
                  })
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                setOpen(true);

            });
  }, [url]);

}