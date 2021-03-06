import React,{useState,useEffect} from 'react'
import {Form,Button,InputGroup} from 'react-bootstrap'
import {Formik} from 'formik'
import {Challengeschema} from '../../../utils/FormSchema'
import SessionNotExist from '../../../utils/SessionNotExist'
import api from '../../../service/api'
import {BsImage} from 'react-icons/bs'
import ImageShow from '../../ImageShow/index'

 const ChallengeFormCreate = () => {

    const [contexts,setContexts] = useState([])
    const [show,setShow] = useState(1)
    const [showModal,setShowModal] = useState(false)
   

    useEffect(() =>{
        
        if(sessionStorage.getItem('token') !== null){ 
            setShow(false)
            handleContexts()
        }else{  setShow(true)} 
                    
                },[])

    function makeOptionsContexts(){
        
        return contexts.map((context,index) =>{
            const {id,name} = context
            return <option key={id} value={id}>{name}</option>
        })
    }

    function showImages(){
        setShowModal(true)
    }
    function modalClose(){setShowModal(false)}
    
    

    function handleContexts(){
        const token = sessionStorage.getItem('token')
        
            api.get('v1/api/auth/contexts',{headers: {Authorization: `Bearer ${token}`}})
            .then(response => {setContexts(response.data)})
            .catch(error => alert(error))
        

    }

    function postChallenge(values){
        const token = sessionStorage.getItem('token')
        api.post(`v1/api/auth/challenges/${values.context}`,{word: values.word,imageUrl: values.imageUrl,videoUrl: values.videoUrl, soundUrl: values.soundUrl},{headers: {Authorization: `Bearer ${token}`}})
                    .then(response => {alert(` O deasfio ${response.data.word} foi criado`)})
                    .catch (error => {alert(`Ocorreu um erro, Tente novamente`)})

    }

    return(

        <Formik validationSchema={Challengeschema} onSubmit={values =>{postChallenge(values)}} initialValues={{context: 0 ,word: '',imageUrl: '',videoUrl: '',soundUrl: ''}}>
        {(
        {
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        touched,
                        isValid,
                        errors,
                        }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                               <SessionNotExist show={show} now={Date.now()}/>
                                 <Form.Group>
                                    <Form.Label>Contexto do desafio</Form.Label>
                                    <Form.Control as="select" name='context' onChange={handleChange} value={values.context} isInvalid={!!errors.context} >
                                            {makeOptionsContexts()}
                                        
                                    </Form.Control>
                                    <Form.Control.Feedback ></Form.Control.Feedback>            
                                    <Form.Control.Feedback type='invalid'>{errors.context}</Form.Control.Feedback>
                                
                                </Form.Group>
                                <Form.Group controlId="formWord">
                                    <Form.Label>Palavra do Desafio</Form.Label>
                                    <Form.Control type="text" placeholder="Palavra do Desafio" name='word'
                                                            onChange={handleChange} 
                                                            value={values.word}
                                                            isValid={touched.word && !errors.word}
                                                            isInvalid={!!errors.word}
                                                            onBlur={handleBlur} />
                                    <Form.Control.Feedback ></Form.Control.Feedback>            
                                    <Form.Control.Feedback type='invalid'>{errors.word}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="formImageUrl">
                                    <ImageShow  handleClose={() => modalClose()} handleURL={(value) => {values.imageUrl = value;modalClose()}}  show={showModal} query={values.word}/>
                                    <Form.Label>Link da Imagem</Form.Label>
                                    <InputGroup>
                                    <InputGroup.Append>
                                        <Button variant="secondary" onClick={() => {showImages()}}><BsImage size='16'/></Button>
                                    </InputGroup.Append>
                                    <Form.Control  placeholder="Link da Imagem" name='imageUrl'
                                                                    onChange={handleChange} 
                                                                    value={values.imageUrl}
                                                                    isValid={touched.imageUrl && !errors.imageUrl}
                                                                    isInvalid={!!errors.imageUrl}
                                                                    onBlur={handleBlur} />
                                        <Form.Control.Feedback ></Form.Control.Feedback>            
                                        <Form.Control.Feedback type='invalid'>{errors.imageUrl}</Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>


                                <Form.Group controlId="formVideoUrl">
                                    <Form.Label>Link do Vídeo </Form.Label>
                                    <Form.Control  placeholder="Link do Vídeo" name='videoUrl'
                                                                            onChange={handleChange} 
                                                                            value={values.videoUrl}
                                                                            isValid={touched.videoUrl && !errors.videoUrl}
                                                                            isInvalid={!!errors.videoUrl}
                                                                            onBlur={handleBlur}  />
                                    <Form.Control.Feedback ></Form.Control.Feedback>            
                                    <Form.Control.Feedback type='invalid'>{errors.videoUrl}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="formSoundUrl">
                                    <Form.Label>Link do Áudio</Form.Label>
                                    <Form.Control  placeholder="Link do Áudio" name='soundUrl'
                                                                                onChange={handleChange} 
                                                                                value={values.soundUrl}
                                                                                isValid={touched.soundUrl && !errors.soundUrl}
                                                                                isInvalid={!!errors.soundUrl}
                                                                                onBlur={handleBlur}  />
                                    <Form.Control.Feedback ></Form.Control.Feedback>            
                                    <Form.Control.Feedback type='invalid'>{errors.soundUrl}</Form.Control.Feedback>
                                </Form.Group>

                               
                                <Button variant='primary' type='submit' block>Cadastrar</Button>


                            </Form>

                        )}
        </Formik>
    )
}

export default ChallengeFormCreate