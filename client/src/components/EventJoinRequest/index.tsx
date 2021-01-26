import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { EventJoinRequestProps } from '../../Types'
import {
  rejectJoinRequest,
  approveJoinRequest
} from '../../redux/actions/eventJoinRequest'
import './EventJoinRequest.scss'

const EventJoinRequest = ({ requester }: EventJoinRequestProps) => {
  const dispatch = useDispatch()
  const [message, setMessage] = useState('')
  const { profile_image, user_id, first_name, last_name, er_id } = requester

  const handleReject = () => {
    try {
      dispatch(rejectJoinRequest(er_id))
      setMessage(`Join request by ${first_name} ${last_name} rejected.`)
    } catch (error) {
      setMessage('Something went wrong. Please try again.')
    }
  }

  const handleApprove = async () => {
    try {
      dispatch(approveJoinRequest(er_id))
      setMessage(`Join request by ${first_name} ${last_name} approved.`)
    } catch (error) {
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <div className='participant'>
      <div className='participant__user-info'>
        <img
          className='participant__image'
          src={profile_image}
          alt={first_name}
        />
        <Link className='participant__link' to={`/user/${user_id}`}>
          <p className='participant__name'>{`${first_name} ${last_name}`}</p>
        </Link>
      </div>
      <FontAwesomeIcon
        onClick={handleApprove}
        className='participant__approve'
        icon={'user-check'}
      />
      <FontAwesomeIcon
        onClick={handleReject}
        className='participant__delete'
        icon={'trash'}
      />
    </div>
  )
}

export default EventJoinRequest
