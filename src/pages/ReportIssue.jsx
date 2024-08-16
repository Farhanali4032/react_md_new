import { useState } from 'react';
import ModalInputCenter from "../components/ModalInputCenter";
import Layout from "../components/LayoutComponents/Layout";
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Spinner from 'react-bootstrap/Spinner';
import axios from "../utils/axios";


const ReportIssue = () => {

  const { response } = useSelector((state) => state.userProfileInfo);
  const [reportInfo, setReportinfo] = useState({
    email: "",
    content: ""
  })

  const [errors, setErros] = useState({
    email: "",
    content: ""
  })

  const [showModal, setShowModal] = useState(true);
  const [loader, setLoader] = useState(false)
  const history = useHistory()


  const handleSubmit = () => {

    if (!reportInfo.content) {
      setErros((prev) => ({
        ...prev,
        content: "This field is mandatory"
      }))

      return;
    }

    setLoader(true)
    axios.post('/reportIssue', reportInfo).then((res) => {
      console.log(res)

      if (res.status == 200) {
        setShowModal(false)
      }
    }).catch((err) => {
      console.log(err);
      alert(err.message)
    }).finally(() => {
      setLoader(false)

    })


  }


  const handleChange = (e) => {
    const { value, name } = e.target;

    setErros((prev) => ({
      ...prev,
      content: "",
      email: ""
    }))

    setReportinfo((prev) => ({
      ...prev,
      [name]: value
    }))

  }


  return (
    <Layout title={`Welcome ${response?.username ? response.username  : ""} `}>

      {
        !showModal &&
        <>
          <div className='d-flex justify-content-center' style={{ marginTop: "100px" }}>
            <h1>Thank you for Reporting {response?.username ? response?.username : ""}</h1>
          </div>

          <div className='d-flex justify-content-center'>
            <button className='btn btnPrimary' onClick={() => { history.push('/dashboard') }}>
              Home
            </button>
          </div>
        </>
      }

      {
        showModal &&
        <ModalInputCenter
          heading="Report Issue"
          show={showModal}
          size="lg"
          changeShow={() => history.push('/dashboard')}
          action={loader ? <> <Spinner animation="border" size="sm" className='mx-1' /> Sending... </> : "Send"}
          handleClick={handleSubmit}
          cancelOption="Cancel"
        >

          <form>
            <div class="form-group">
              <label for="exampleFormControlInput1">Email address</label>
              <input name='email' onChange={handleChange} type="email" class="form-control" placeholder="name@example.com" />
            </div>

            <div class="form-group">
              <label for="exampleFormControlTextarea1">Report Issue</label>
              <textarea name='content' onChange={handleChange} class="form-control" rows="3"></textarea>
              {errors.content && <>
                <span className='text-danger'>
                  {errors.content}
                </span>
              </>}

            </div>
          </form>

        </ModalInputCenter>
      }



    </Layout>
  )
}

export default ReportIssue