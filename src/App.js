import { Form, Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import './index.css';
import { FaGithub } from "react-icons/fa";
import { useState } from 'react';
import AppStyles, {Container, Row, Col, Title, Icon} from './AppStyles'

function App() {
  const [response, setResponse] = useState({})

  const onSubmit = async values => {

    try {
      const fetchResponse = await fetch(`https://frosty-wood-6558.getsandbox.com:443/dishes`, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(values),
      })
      setResponse(await fetchResponse.json())
    } catch(error) {
      setResponse(error.message)
    }

  }

  return (
    <AppStyles>
      <Title>
        POST DISH
      </Title>
    
      <Form
        onSubmit={onSubmit}

        validate={values => {
          const errors = {}
          if (!values.name) {
            errors.name = 'Field required'
          }

          if (!values.preparation_time) {
            errors.preparation_time = 'Field required'
          } else if (!/^[0-9][0-9]:[0-5][0-9]:[0-5][0-9]$/.test(values.preparation_time)) {
            errors.preparation_time = '00:00:00 format required'
          }

          if (!values.type || values.type === '') {
            errors.type = 'Field required'
          }

          if (values.type === 'pizza' && !values.no_of_slices) {
            errors.no_of_slices = 'Field required'
          } else if (values.no_of_slices && (values.no_of_slices % 1 !== 0 || values.no_of_slices <= 0)) {
            errors.no_of_slices = 'Integer value greater than 0 required'
          }

          if (values.type === 'pizza' && !values.diameter) {
            errors.diameter = 'Field required'
          } else if (values.diameter && values.diameter <= 0) {
            errors.diameter = 'Value greater than 0 required'
          }

          if (values.type === 'soup' && !values.spiciness_scale) {
            errors.spiciness_scale = 'Field required'
          } else if (values.spiciness_scale && (values.spiciness_scale % 1 !== 0 || values.spiciness_scale <= 0 || values.spiciness_scale > 10)) {
            errors.spiciness_scale = 'Integer value greater than 0 and less than or equal to 10 required'
          }
          if (values.type === 'sandwich' && !values.slices_of_bread) {
            errors.slices_of_bread = 'Field required'
          } else if (values.slices_of_bread && (values.slices_of_bread % 1 !== 0 || values.slices_of_bread <= 0)) {
            errors.slices_of_bread = 'Integer value greater than 0 required'
          }

          return errors
        }}

        render={({handleSubmit, form, values, submitting, pristine}) => (
          <Container>
            <Row>
              <Col>
                <form onSubmit={handleSubmit}>

                  <OnChange name='type'>{/*resets conditionally required values when select option changes*/}
                    {value => {
                      form.reset({
                        ...values,
                        no_of_slices: undefined,
                        diameter: undefined,
                        spiciness_scale: undefined,
                        slices_of_bread: undefined,
                        type: value,
                      });
                    }}
                  </OnChange>

                  <Field name='name'>
                    {({ input, meta }) => (
                      <div>
                        <label>Dish Name</label>
                        <input {...input} type='text' placeholder='Dish Name' />
                        {meta.error && meta.touched && <span>{meta.error}</span>}
                      </div>
                    )}
                  </Field>

                  <Field name='preparation_time'>
                    {({ input, meta }) => (
                      <div>
                        <label>Preparation Time</label>
                        <input {...input} type='text' placeholder='Preparation Time' />
                        {meta.error && meta.touched && <span>{meta.error}</span>}
                      </div>
                    )}
                  </Field>

                  <Field name='type'>
                    {({ input, meta }) => (
                      <div>
                        <label>Dish Type</label>
                        <select {...input}>
                          <option />
                          <option value='pizza'>Pizza</option>
                          <option value='soup'>Soup</option>
                          <option value='sandwich'>Sandwich</option>
                        </select>
                        {meta.error && meta.touched && <span>{meta.error}</span>}
                      </div>
                    )}
                  </Field>            

                  {values.type === 'pizza' ?
                    <> 
                      <Field name='no_of_slices' parse={value => parseInt(value)}>
                        {({ input, meta }) => (
                          <div>
                            <label>Number of slices</label>
                            <input {...input} type='number' placeholder='Number of slices' />
                            {meta.error && meta.touched && <span>{meta.error}</span>}
                          </div>
                        )}
                      </Field>

                      <Field name='diameter' parse={value => parseFloat(value)}>
                        {({ input, meta }) => (
                          <div>
                            <label>Diameter</label>
                            <input {...input} type='number' placeholder='Diameter' />
                            {meta.error && meta.touched && <span>{meta.error}</span>}
                          </div>
                        )}
                      </Field>
                    </>
                  : ''}

                  {values.type === 'soup' ?
                    <Field name='spiciness_scale' parse={value => parseInt(value)}>
                      {({ input, meta }) => (
                        <div>
                          <label>Spiciness scale</label>
                          <input {...input} type='number' placeholder='Spiciness scale' />
                          {meta.error && meta.touched && <span>{meta.error}</span>}
                        </div>
                      )}
                    </Field>
                  : ''}

                  {values.type === 'sandwich' ?
                    <Field name='slices_of_bread' parse={value => parseInt(value)}>
                      {({ input, meta }) => (
                        <div>
                          <label>Slices of bread</label>
                          <input {...input} type='number' placeholder='Slices of bread' />
                          {meta.error && meta.touched && <span>{meta.error}</span>}
                        </div>
                      )}
                    </Field>
                  : ''}

                  <div>
                    <button type="submit" disabled={submitting || pristine}>
                      POST
                    </button>
                    <button
                      type="button"
                      onClick={() => {form.reset({
                        name: undefined,
                        preparation_time: undefined,
                        type: undefined,
                        no_of_slices: undefined,
                        diameter: undefined,
                        spiciness_scale: undefined,
                        slices_of_bread: undefined,
                      });
                        setResponse({})}}
                      disabled={submitting || pristine}
                    >
                      Clear form
                    </button>
                  </div>
                </form>
              </Col>
          
              <Col>
                <Title>Request</Title>
                <pre>{JSON.stringify(values, 0, 2)}</pre>
              </Col>
              <Col>
                <Title>Response</Title>
                <pre>{JSON.stringify(response, 0 , 2)}</pre>
              </Col>
            </Row>
          </Container>
        )}      
      />
    
      <Icon>
        <a href="https://github.com/greed-hub">
          <FaGithub/>
        </a>
      </Icon>
    </AppStyles>
 
  );
}

export default App;
