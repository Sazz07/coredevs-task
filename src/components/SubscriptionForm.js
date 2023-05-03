import { useState, useRef } from 'react';
import hitToast from '../helpers/hitToast';

export default function SubscriptionForm() {
  let [email, setEmail] = useState('');
  let [alertClass, setAlertClass] = useState('');
  var parentComp = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);

    if (!validate(email)) {
      setAlertClass('alert-validate');
      return;
    }
    fetch('https://coredevs-task-server.vercel.app/sendmail', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ email })
    }).then(res => res.json())
      .then(data => JSON.parse(`${data}`))
      .then(data => hitToast(data.message, data.success ? 'success' : 'error'))
      .catch(() => hitToast('Something went wrong. Please try again.', 'error'))

    setAlertClass('');
  }

  const validate = (email) => {
    if (email.trim(/^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/).match() == null) {
      return false;
    } else if (email.trim() === '') {
      return false;
    }

    return true;
  }
  
  return (
    <form className="w-full flex-w flex-c-m validate-form" onSubmit={handleSubmit}>
      <div ref={parentComp} className={"wrap-input100 validate-input where1 " + alertClass} data-validate="Valid email is required: user@email.domain">
        <input className="input100 placeholder0 s2-txt2" type="text" name="email" placeholder="Enter Email Address" onChange={e => setEmail(e.target.value)} />
        <span className="focus-input100"></span>
      </div>

      <button type='submit' className="flex-c-m size3 s2-txt3 how-btn1 trans-04 where1">
        Subscribe
      </button>
    </form>
  );
}
