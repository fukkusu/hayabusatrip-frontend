import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import 'react-responsive-modal/styles.css'
import type { DbTripData } from '@/api/tripApi'
import { Meta } from '@/components/Meta'
import { TripCard } from '@/components/TripCard'
import { Pagination } from '@/components/Pagination'
import { Spinner } from '@/components/Spinner'
import { TripFilter } from '@/components/TripFilter'
import { useAuthContext } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'

export default function Home() {
  const router = useRouter()
  const { showToast } = useToast()
  const { currentUser, dbTripsData, authLoading } = useAuthContext()

  const [pageNumber, setPageNumber] = useState(0)
  const itemsPerPage = 12
  const pagesVisited = pageNumber * itemsPerPage

  const [filteredData, setFilteredData] = useState<DbTripData[]>([])

  useEffect(() => {
    setPageNumber(0)
  }, [dbTripsData])

  if (authLoading || !dbTripsData) {
    return (
      <div className="flex justify-center items-center mt-16">
        <Spinner />
      </div>
    )
  }

  if (!currentUser) {
    router.push('/')
    showToast('error', 'ログインしてください。')
  }

  if (dbTripsData.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <Image
          src={`${process.env.NEXT_PUBLIC_S3_OBJECT_URL}/utils/sleeping-dog.png`}
          alt={'旅行プランがない時の眠る犬のイラスト'}
          width={250}
          height={250}
        />
        <p className="text-gray-700">
          旅行プランはありません。
          <br />
          次の旅行に向けて準備しませんか？
        </p>
      </div>
    )
  }

  return (
    <>
      <Meta />
      <>
        <div className="m-4 space-y-4">
          <TripFilter
            dbTripsData={dbTripsData}
            setFilteredData={setFilteredData}
          />

          {filteredData.length === 0 && (
            <div className="flex flex-col items-center">
              <p className="text-gray-700">
                検索条件に一致する旅行プランが見つかりませんでした。
                <br />
                検索条件を変更してください。
              </p>
              <Image
                src={`${process.env.NEXT_PUBLIC_S3_OBJECT_URL}/utils/playing-cat.png`}
                alt={'旅行プランが見つからない時のボールで遊ぶ猫のイラスト'}
                width={250}
                height={250}
              />
            </div>
          )}

          {filteredData.length !== 0 && (
            <>
              <div className="grid grid-cols-auto-fill gap-4">
                {filteredData
                  .slice()
                  .reverse()
                  .slice(pagesVisited, pagesVisited + itemsPerPage)
                  .map((trip) => (
                    <TripCard key={trip.id} trip={trip} />
                  ))}
              </div>

              <Pagination
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                itemsPerPage={itemsPerPage}
                dataLength={filteredData.length || 0}
              />
            </>
          )}
        </div>
      </>
    </>
  )
}
