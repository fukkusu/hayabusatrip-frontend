import { useAuthContext } from '@/context/AuthContext'
import { useS3Api } from '@/hooks/useS3Api'
import { useSpotApi } from '@/hooks/useSpotApi'
import { useTripApi } from '@/hooks/useTripApi'

jest.mock('@/context/AuthContext')
jest.mock('@/hooks/useTripApi')
jest.mock('@/hooks/useSpotApi')
jest.mock('@/hooks/useS3Api')

export const useAuthContextMock = useAuthContext as jest.Mock
export const useTripApiMock = useTripApi as jest.Mock
export const useSpotApiMock = useSpotApi as jest.Mock
export const useS3ApiMock = useS3Api as jest.Mock

export const pushMock = jest.fn()
export const updateUserMock = jest.fn()
export const resetPasswordMock = jest.fn()
export const deleteAccountMock = jest.fn()
export const signupMock = jest.fn()
export const loginWithEmailAndPasswordMock = jest.fn()
export const loginWithGoogleMock = jest.fn()
export const logoutMock = jest.fn()
export const scrollMock = jest.fn()
window.scrollTo = scrollMock

export const getTripMock = jest.fn().mockResolvedValue(true)
export const createTripMock = jest.fn().mockResolvedValue(true)
export const copyTripMock = jest.fn().mockResolvedValue(true)
export const updateTripMock = jest.fn().mockResolvedValue(true)
export const deleteTripMock = jest.fn().mockResolvedValue(true)
export const deleteTripDateMock = jest.fn().mockResolvedValue(true)
export const getSpotsMock = jest.fn().mockResolvedValue(true)
export const createSpotMock = jest.fn().mockResolvedValue(true)
export const updateSpotMock = jest.fn().mockResolvedValue(true)
export const deleteSpotMock = jest.fn().mockResolvedValue(true)
export const uploadUserIconImageMock = jest.fn().mockResolvedValue(true)
export const uploadTripImageMock = jest.fn().mockResolvedValue(true)

export const configureApiMocks = () => {
  useTripApiMock.mockReturnValue({
    getTrip: getTripMock,
    createTrip: createTripMock,
    copyTrip: copyTripMock,
    updateTrip: updateTripMock,
    deleteTrip: deleteTripMock,
    deleteTripDate: deleteTripDateMock,
  })
  useSpotApiMock.mockReturnValue({
    getSpots: getSpotsMock,
    createSpot: createSpotMock,
    updateSpot: updateSpotMock,
    deleteSpot: deleteSpotMock,
  })
  useS3ApiMock.mockReturnValue({
    uploadTripImage: uploadTripImageMock,
    uploadUserIconImage: uploadUserIconImageMock,
  })
}

export const currentUserMock = {
  uid: 'uidMock',
  email: 'mock@mock.com',
  getIdToken: jest.fn().mockReturnValue('idTokenMock'),
}

export const dbUserDataMock = {
  id: 1,
  name: 'nameMock',
}

export const notTripOwnerMock = {
  id: 2,
  name: 'notTripOwner',
}

export const selectedTripMock = {
  id: 1,
  user_id: 1,
  prefecture_id: 1,
  title: '北海道旅行',
  start_date: '2023-07-01',
  end_date: '2023-07-02',
  memo: '',
  image_path: 'hokkaido.jpg',
  is_public: false,
  trip_token: 'tripTokenMock',
  created_at: '2023-07-01T09:00:00.000+09:00',
  updated_at: '2023-07-01T09:00:00.000+09:00',
}

export const dbTripsDataMock = [selectedTripMock]

export const dbSpotsDataMock = [
  {
    id: 1,
    trip_id: 1,
    category: 'car',
    name: '移動',
    date: '2023-07-01',
    start_time: '2000-01-01T09:00:00.000+09:00',
    end_time: '2000-01-01T12:00:00.000+09:00',
    cost: 15000,
    memo: 'レンタカーを事前に予約する',
    created_at: '2023-07-01T09:00:00.000+09:00',
    updated_at: '2023-07-01T09:00:00.000+09:00',
  },
  {
    id: 2,
    trip_id: 1,
    category: 'meal',
    name: '昼食',
    date: '2023-07-01',
    start_time: '2000-01-01T12:00:00.000+09:00',
    end_time: '2000-01-01T13:00:00.000+09:00',
    cost: 1000,
    memo: '',
    created_at: '2023-07-01T09:00:00.000+09:00',
    updated_at: '2023-07-01T09:00:00.000+09:00',
  },
  {
    id: 3,
    trip_id: 1,
    category: 'sightseeing',
    name: '観光',
    date: '2023-07-01',
    start_time: '2000-01-01T13:00:00.000+09:00',
    end_time: '2000-01-01T17:00:00.000+09:00',
    cost: 2000,
    memo: '',
    created_at: '2023-07-01T09:00:00.000+09:00',
    updated_at: '2023-07-01T09:00:00.000+09:00',
  },
  {
    id: 4,
    trip_id: 1,
    category: 'stay',
    name: 'チェックイン',
    date: '2023-07-01',
    start_time: '2000-01-01T17:00:00.000+09:00',
    end_time: '2000-01-01T18:00:00.000+09:00',
    cost: 10000,
    memo: '',
    created_at: '2023-07-01T09:00:00.000+09:00',
    updated_at: '2023-07-01T09:00:00.000+09:00',
  },
  {
    id: 5,
    trip_id: 1,
    category: 'stay',
    name: 'チェックアウト',
    date: '2023-07-02',
    start_time: '2000-01-01T09:00:00.000+09:00',
    end_time: '2000-01-01T10:00:00.000+09:00',
    cost: 0,
    memo: '',
    created_at: '2023-07-01T09:00:00.000+09:00',
    updated_at: '2023-07-01T09:00:00.000+09:00',
  },
  {
    id: 6,
    trip_id: 1,
    category: 'meal',
    name: '昼食',
    date: '2023-07-02',
    start_time: '2000-01-01T12:00:00.000+09:00',
    end_time: '2000-01-01T13:00:00.000+09:00',
    cost: 1000,
    memo: '',
    created_at: '2023-07-01T09:00:00.000+09:00',
    updated_at: '2023-07-01T09:00:00.000+09:00',
  },
  {
    id: 7,
    trip_id: 1,
    category: 'sightseeing',
    name: '観光',
    date: '2023-07-02',
    start_time: '2000-01-01T13:00:00.000+09:00',
    end_time: '2000-01-01T17:00:00.000+09:00',
    cost: 2000,
    memo: '',
    created_at: '2023-07-01T09:00:00.000+09:00',
    updated_at: '2023-07-01T09:00:00.000+09:00',
  },
  {
    id: 8,
    trip_id: 1,
    category: 'car',
    name: '帰宅',
    date: '2023-07-02',
    start_time: '2000-01-01T17:00:00.000+09:00',
    end_time: '2000-01-01T20:00:00.000+09:00',
    cost: 0,
    memo: '',
    created_at: '2023-07-01T09:00:00.000+09:00',
    updated_at: '2023-07-01T09:00:00.000+09:00',
  },
]

export const selectedSpotMock = {
  id: 1,
  trip_id: 1,
  category: 'car',
  name: '移動',
  date: '2023-07-01',
  start_time: '2000-01-01T09:00:00.000+09:00',
  end_time: '2000-01-01T12:00:00.000+09:00',
  cost: 15000,
  memo: 'レンタカーを事前に予約する',
  created_at: '2023-07-01T09:00:00.000+09:00',
  updated_at: '2023-07-01T09:00:00.000+09:00',
}
