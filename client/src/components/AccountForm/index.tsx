import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Button from '../Button'
import FormInputField from '../FormInputField'
import FormInputTextArea from '../FormInputTextArea'
import FormDropdownField from '../FormDropdownField'
import GoogleAutoComplete from '../GoogleAutoComplete'
import { useFormFields } from '../../hooks/useFormFields'
import { genderOptions } from '../../util/constants/genderOptions'
import { AccountFormProps } from '../../types'
import './AccountForm.scss'
type UserInfoType = {
  email: string
  first_name: string
  last_name: string
  date_of_birth: any
  gender: string
  base_address: string
  profile_text: string
  profile_image: string
}

const AccountForm = ({ userId }: AccountFormProps) => {
  const [loading, setLoading] = useState(true)
  const [userInfo, setUserInfo] = useState<UserInfoType>()
  const [address, setAddress] = useState({})
  const getUserInfo = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/api/v1/users/${userId}`)
      console.log(data)
      setUserInfo(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
    console.log(userInfo)
  }

  console.log('hi')
  const [fields, handleFieldChange] = useFormFields({
    email: '',
    first_name: userInfo?.first_name,
    last_name: 'Yo',
    date_of_birth: '',
    gender: '',
    base_address: '',
    profile_text: '',
    profile_image: ''
  })
  useEffect(() => {
    getUserInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  //console.log(userInfo?.email)

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    try {
      const update = { ...fields, address }
      const res = await axios({
        method: 'PUT',
        url: `api/v1/users/${userId}`,
        data: update
      })
      alert(
        'Thank you!\nThe changes have been saved and you can now safely leave this page, or make further changes if you spotted a mistake.'
      )
    } catch (error) {
      console.log(error)
    }
  }
  //console.log(fields)
  if (loading) return <div>Loading</div>
  return (
    <form className='form' onSubmit={handleSubmit}>
      <h2 className='form__title'>Edit</h2>
      <FormInputField
        type='email'
        id='email'
        label='Email'
        value={fields.email}
        readOnly
      />
      <FormInputField
        type='text'
        id='first_name'
        label='First name'
        value={fields.first_name}
        onChange={handleFieldChange}
      />
      <FormInputField
        type='text'
        id='last_name'
        label='Last name'
        value={fields.last_name}
        onChange={handleFieldChange}
      />
      <FormInputField
        type='date'
        id='date_of_birth'
        value={fields.date_of_birth}
        label='Birthday'
        onChange={handleFieldChange}
      />
      <FormDropdownField
        label='Gender'
        id='gender'
        options={genderOptions}
        onBlur={handleFieldChange}
      />
      <FormInputField
        type='text'
        id='base_address'
        label='Default start address'
        value={'Saved address: ' + fields.base_address}
        readOnly
      />
      <GoogleAutoComplete handleAddress={setAddress} />
      <FormInputTextArea
        id='profile_text'
        label='Profile text'
        value={fields.profile_text}
        onChange={handleFieldChange}
        rows={1}
      />
      <div className='image-upload'>
        <FormInputField
          className='image-upload__field'
          type='url'
          id='profile_image'
          label='Image url'
          value={fields.profile_image}
          onChange={handleFieldChange}
        />
        {fields.profile_image && (
          <img
            className='image-upload__image'
            src={fields.profile_image}
            alt='What we currently display'
          />
        )}
      </div>
      <Button type='submit' text='Submit' />
    </form>
  )
}

export default AccountForm
