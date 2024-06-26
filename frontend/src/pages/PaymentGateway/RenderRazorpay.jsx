import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import crypto from 'crypto-js'
import PropTypes from 'prop-types'
import Axios from 'axios'

const loadScript = (src) =>
  new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = () => {
      console.log('razorpay loaded successfully')
      resolve(true)
    }
    script.onerror = () => {
      console.log('error in loading razorpay')
      resolve(false)
    }
    document.body.appendChild(script)
  })

const RenderRazorpay = ({ orderId, keyId, keySecret, currency, amount }) => {
  const navigate = useNavigate()

  const paymentId = useRef(null)
  const paymentMethod = useRef(null)
  useEffect(() => {
    console.log('in razorpay')
    displayRazorpay(options)
  }, [])
  const displayRazorpay = async (options) => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
    if (!res) {
      console.log('Razorpay SDK failed to load. Are you online?')
      return
    }
    const rzp1 = new window.Razorpay(options)

    rzp1.on('payment.submit', (response) => {
      paymentMethod.current = response.method

    })

    rzp1.on('payment.failed', (response) => {
      paymentId.current = response.error.metadata.payment_id
    })

    rzp1.open()
  }

  const handlePayment = async (status, orderDetails = {}) => {
    await Axios.post(`http://localhost:5000/payment`, {
      status,
      orderDetails,
    })
  }

  const options = {
    key: keyId,
    amount,
    currency,
    name: 'USER',
    order_id: orderId,
    handler: (response) => {
      console.log('succeeded')
      console.log(response)
      paymentId.current = response.razorpay_payment_id
      const succeeded =
        crypto
          .HmacSHA256(`${orderId}|${response.razorpay_payment_id}`, keySecret)
          .toString() === response.razorpay_signature
      if (succeeded) {
        navigate('/hogya')
      } else {
        navigate('/nahihua')
      }
    },
    modal: {
      confirm_close: true,
      ondismiss: async (reason) => {
        const {
          reason: paymentReason,
          field,
          step,
          code,
        } = reason && reason.error ? reason.error : {}
        if (reason === undefined) {
          console.log('cancelled')
          handlePayment('Cancelled')
        } else if (reason === 'timeout') {
          console.log('timedout')
          handlePayment('timedout')
        } else {
          console.log('failed')
          handlePayment('failed', {
            paymentReason,
            field,
            step,
            code,
          })
        }
      },
    },
    retry: {
      enabled: false,
    },
    timeout: 900,
    theme: {
      color: '',
    },
  }

  return null
}

export default RenderRazorpay
