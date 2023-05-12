import axios from 'axios'
import { uploadImageToS3 } from '@/api/S3Api'
import { usersUrl } from '@/utils/url'
import {
  CREATE_USER_ERROR_MSG,
  GET_USER_ERROR_MSG,
  UPDATE_USER_ERROR_MSG,
  DELETE_USER_ERROR_MSG,
} from '@/utils/constants'
import { getTimestamp } from '@/utils/getTimestamp'

export type DbUserData = {
  id: number
  uid: string
  created_at: string
  updated_at: string
  name: string
  icon_path: string
  request_count: number
  last_reset_date: string | null
  last_login_time: string | null
}

type CreateUserOptions = {
  uid: string
  name: string
  icon_path?: string
}

type UpdateUserOptions = {
  uid: string
  name?: string
  icon_path?: string
  request_count?: number
  last_reset_date?: string
  last_login_time?: string
}

// 全てのユーザー情報の取得
export const getUsersAPI = async (idToken: string) => {
  try {
    const res = await axios.get(usersUrl, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    })
    return res.data
  } catch (e) {
    throw new Error(GET_USER_ERROR_MSG)
  }
}

// 特定のユーザー情報の取得
export const getUserAPI = async (idToken: string, uid: string) => {
  try {
    const res = await axios.get(`${usersUrl}/${uid}`, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    })
    return res.data
  } catch (e) {
    throw new Error(GET_USER_ERROR_MSG)
  }
}

// 特定のユーザー情報の取得
export const createUserAPI = async (
  idToken: string,
  options: CreateUserOptions
) => {
  try {
    const params: { user: CreateUserOptions } = {
      user: options,
    }

    const res = await axios.post(usersUrl, params, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    })
    return res.data
  } catch (e) {
    throw new Error(CREATE_USER_ERROR_MSG)
  }
}

// ユーザー情報の更新
export const updateUserAPI = async (
  idToken: string,
  options: UpdateUserOptions,
  imageFile?: File
) => {
  try {
    const params: { user: UpdateUserOptions } = {
      user: options,
    }

    if (imageFile) {
      const filename = `${options.uid}-${getTimestamp()}.${
        imageFile.type.split('/')[1]
      }`
      const imageUrl = await uploadImageToS3(imageFile, filename)
      params.user.icon_path = imageUrl
    }

    const res = await axios.patch(`${usersUrl}/${options.uid}`, params, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    })
    return res.data
  } catch (e) {
    throw new Error(UPDATE_USER_ERROR_MSG)
  }
}

// ユーザーの削除
export const deleteUserAPI = async (idToken: string, uid: string) => {
  try {
    const res = await axios.delete(`${usersUrl}/${uid}`, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    })
    return res.data
  } catch (e) {
    throw new Error(DELETE_USER_ERROR_MSG)
  }
}
