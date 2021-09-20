import React from 'react';
import { Button, Col, Container, Label, Row } from "reactstrap";
import { Form, Formik } from "formik";
import { FormArray, FormField } from "./index";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_DIALOGS_SETTINGS } from "../redux/slices/usersSlice";

const DialogsSettings = () => {
  const {data: user, settings} = useSelector(state => state.users)
  const dispatch = useDispatch()

  return (
    <Container>
      <Formik
        initialValues={{...settings}}
        onSubmit={values => {
          dispatch(UPDATE_DIALOGS_SETTINGS({
            uid: user.uid,
            phrases: values.phrases,
            themes: values.themes,
            subtopics: values.subtopics,
            autoGreetings: values.autoGreetings
          }))
        }}
        render={({values}) => (
          <Form>
            <Row className='mb-2'>
              <Col className='border-end'>
                <Row>
                  <FormArray values={values} nameArr='phrases' title='Готовые фразы'/>
                </Row>
                <Row>
                  <Label htmlFor='autoGreetings'>
                    Автоматическое приветствие:
                  </Label>
                  <FormField name='autoGreetings'/>
                </Row>
              </Col>
              <Col>
                <Row>
                  <FormArray values={values} nameArr='themes' title='Список тем'/>
                </Row>
                <Row>
                  <FormArray values={values} nameArr='subtopics' title='Список подтем'/>
                </Row>
              </Col>
            </Row>
            <Button type='submit'>Сохранить</Button>
          </Form>
        )}
      />
    </Container>
  );
};

export default DialogsSettings;
