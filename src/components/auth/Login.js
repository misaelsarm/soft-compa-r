import React, { useState } from 'react'
import { Form, Input, Button, Row, Col, message } from 'antd';
import { Link } from 'react-router-dom';
import restaurante from '../../assets/restaurante.jpg';


export const Login = () => {

    const [resetPassword, setResetPassword] = useState(false)
    const onFinish = ({ email, password }) => {
        /* if (!password) {
            sendEmail(email)
        } else {
            dispatch(startLoginEmailPassword(email, password))
        } */
    };

    const sendEmail = (email) => {
        /* firebase.auth().sendPasswordResetEmail(email).then(() => {
            message.info('An email was sent with a link to reset Tu password')
            setResetPassword(false)
        }).catch((error) => {
            message.error(error.message);
        }) */
    }
    const layout = {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 },
    };
    const tailLayout = {
        wrapperCol: { span: 24 },
    };

    return (
        <div className="login-container">
            <div className="left">
                {
                    !resetPassword ? <h2>Inicia sesion en SOFT-COMPA-R</h2> :
                        <div style={{ width: '50%' }}>
                            <h2>¿Olvidaste tu contraseña?</h2>
                            <p>Ingresa el correo que utilizaste cuando te registraste y te enviaremos las instrucciones para restablecer tu contraseña</p>
                        </div>
                }
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Correo electronico"
                        name="correo"
                        rules={[{ required: true, message: 'Tu correo es obligatorio' }]}
                    >
                        <Input placeholder="Tu correo" />
                    </Form.Item>

                    {
                        !resetPassword && <Form.Item
                            label="Contraseña"
                            name="contrasena"
                            rules={[{ required: true, message: 'Tu contraseña es obligatoria' }]}
                        >
                            <Input.Password placeholder="Tu contraseña" />
                        </Form.Item>
                    }
                    {
                        !resetPassword ? <Form.Item {...tailLayout}>
                            <Button style={{ width: '100%' }} type="primary" htmlType="submit">
                                Iniciar sesión
                        </Button>
                        </Form.Item> : <Form.Item {...tailLayout}>
                                <Button style={{ width: '100%' }} type="primary" htmlType="submit">
                                    Enviar link para restablecer contraseña
                        </Button>
                            </Form.Item>
                    }
                    <Row style={{ marginTop: 10, textAlign: 'center' }}>
                        {
                            !resetPassword && <Col offset={4} span={16} >
                                <Button type='link' onClick={() => { setResetPassword(true) }} >¿Olvidaste tu contraseña?</Button>
                            </Col>
                        }
                        {
                            resetPassword && <Col offset={4} span={16} >
                                <Button type='link' onClick={() => { setResetPassword(false) }} >Regresar</Button>
                            </Col>
                        }
                    </Row>
                </Form>

            </div>
            <div className="right">
                <img alt="Login Cover" className="plane" src={restaurante} />
                <div className="overlay">

                </div>
            </div>
        </div>
    )
}
