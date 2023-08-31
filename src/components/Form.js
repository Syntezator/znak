import { useState } from "react";
import InputMask from 'react-input-mask';

export const Form = () => {
  const [showSubmit, setShowSubmit] = useState(true);
  const [showError, setShowError] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const nameHandler = (e) => {
    setName(e.target.value)
  };
  const phoneHandler = (e) => {
    setPhone(e.target.value)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(phone.length < 18){
      setShowError(true);
      return
    }
    setShowSubmit(false);
    setShowError(false);
  };

  return (
    <form
            id="main-form"
            className="main-contacts__form"
            
            onSubmit={handleSubmit}
          >
            <div className="input-row">
              <div className="input-group">
                <input
                  id="main-contacts__name"
                  className="input-text"
                  type="text"
                  name="main-contacts__name"
                  placeholder="Иванов Петр Яковлевич"
                  defaultValue=""
                  required
                  value={name}
                  onChange={e => nameHandler(e)}
                />
                <label className="input-label" htmlFor="main-contacts__name">
                  Имя
                </label>
              </div>
              <div className="input-group">
              <InputMask
                mask="+7 (999) 999 99 99"
                value={phone}
                maskChar=''
                onChange={phoneHandler}
              >
                {(inputProps) => (
                  <input
                    id="main-contacts__phone"
                    className="input-text tel"
                    type="text"
                    inputMode="numeric"
                    name="main-contacts__phone"
                    placeholder="+7 987 52 54 96"
                    required
                    {...inputProps}
                  />
                )}
              </InputMask>
                
               
                <label className="input-label" htmlFor="main-contacts__phone">
                  Телефон
                </label>
              </div>
            </div>
            
            {showError && <div className="form-error">Форма содержит ошибки</div>}
            {showSubmit && <button className="btn-default" type="submit">Связаться</button>}
            {!showSubmit && <div className="form-success">Форма успешно отправлена</div>}
            
            
          </form>
  );
}