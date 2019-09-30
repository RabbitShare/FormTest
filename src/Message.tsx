import { Field, Form } from 'formik';
import { Users } from './types/Users';
import { Values } from './Form';
import React from 'react';

interface MessageProps {
  values: Values;
  handleChange: ((value: string) => void);
  users: Users[];
  setFieldValue(field: keyof Values & string, value: any, shouldValidate?: boolean): void;
}
export const Message: React.SFC<MessageProps> = props => {
  return (<Form>
    <label htmlFor="destination">Выберете получателя</label>
    <Field 
      id="destination" 
      name="destination" 
      component="select" 
      onChange={(e: any) => {
        const user = props.users.find(u => u.name === e.target.value);
        console.log(e);
        if (user)
          props.setFieldValue('email', user.email);
        else
          props.setFieldValue('email', '');
        props.handleChange(e);
    }}>
      <option value="">Напишу самостоятельно</option>
      {props.users.map(user => <option key={user.id}>{user.name}</option>)}
    </Field>

    <label htmlFor="email">Почта</label>
    <Field 
      id="email" 
      name="email" 
      placeholder="email@mail.com" 
      type="email" 
      required 
      value={props.values.email} 
      disabled={props.values.destination !== '' ? true : false}/>

    <label htmlFor="message">Сообщение</label>
    <Field 
      id="message" 
      name="message" 
      placeholder="Введите сообщение" 
      component="textarea" 
      required />

    <label htmlFor="agreement">Соглашение</label>
    <Field 
      id="agreement" 
      type="checkbox" 
      required />

    <button type="submit" style={{ display: 'block' }}>
      Отправить
        </button>
  </Form>);
};
