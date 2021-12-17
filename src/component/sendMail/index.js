import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import './SendMail.css';
import { Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { closeSendMessage } from '../../redux/features/mailSlice';
import { db } from '../../firebase';
import firebase from 'firebase';

const SendMail = () => {
  const { register, handleSubmit, errors } = useForm();

  const dispatch = useDispatch();

  const onSubmit = (formData) => {
    console.log(formData);
    db.collection('emails').add({
      to: formData.to,
      subject: formData.subject,
      message: formData.message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    dispatch(closeSendMessage());
  };

  return (
    <div className={'send-mail'}>
      <div className={'send-mail-header'}>
        <h3>New Message</h3>
        <CloseIcon
          onClick={() => dispatch(closeSendMessage())}
          className={'send-mail-close'}
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name='to'
          placeholder={'To'}
          type='email'
          ref={register({ required: true })}
        />
        {errors.to && <p className={'send-mail-error'}>To is required</p>}
        <input
          name='subject'
          placeholder={'Subject'}
          type='text'
          ref={register({ required: true })}
        />
        {errors.subject && (
          <p className={'send-mail-error'}>Subject is required</p>
        )}
        <input
          name='message'
          className={'send-mail-message'}
          placeholder={'Message'}
          type='text'
          ref={register({ required: true })}
        />
        {errors.message && (
          <p className={'send-mail-error'}>Message is required</p>
        )}

        <div className='send-mail-options'>
          <Button
            variant={'contained'}
            color={'primary'}
            type={'submit'}
            className={'send-mail-button'}
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SendMail;
