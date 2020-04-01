import * as React from 'react';
import { Formik, FormikActions, FormikProps } from 'formik';
import { getUsers } from '../services/getUsers';
import { Users } from '../types/Users';
import { Message } from './Message';

export interface Values {
  destination: string
  email: string
  message: string
  agreement: boolean
}

interface MessageFormState {
  users: Users[]
  loading: boolean
}

export class MessageForm extends React.Component<{}, MessageFormState> {
  loading = false

  async componentDidMount() {
    this.loading = true
    const users = await getUsers()
    if (this.loading)
        this.setState({ users })
  }

  componentWillUnmount() {
    this.loading = false;
  }

  render() {
    return (
      <div className="container">
        <h1>Отправка сообщения</h1>
        {this.loading &&
          (<Formik
            initialValues={{
              destination: '',
              email: '',
              message: '',
              agreement: false
            }}

            onSubmit={(values: Values, { setSubmitting }: FormikActions<Values>) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 500);
            }}
            
            render={(props: FormikProps<Values>) =>
            (<Message 
              values={props.values}
              setFieldValue={props.setFieldValue}
              handleChange={props.handleChange}
              users={this.state.users}
            />)}
          />)}
      </div>
    )}
}

