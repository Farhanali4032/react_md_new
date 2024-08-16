import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getSingleMatterData } from "../getSingleMatterData/getSingleMattersDataActions"
import { selectSingleMatterCourtData, selectSingleMatterCourtError, selectSingleMatterCourtLoading } from "../getSingleMatterData/getSingleMattersDataSelectors"

export function CourtData (matterId) {
    const dispatch = useDispatch()
    useEffect(() => {
      const fetchData = async () => {
        await dispatch(getSingleMatterData(matterId, 'court'))
      }
      fetchData()
    }, [])
  
    const selectCourt = useSelector(selectSingleMatterCourtData)
    const selectCourtLoading = useSelector(selectSingleMatterCourtLoading)
    const selectCourtError = useSelector(selectSingleMatterCourtError)
  
    return {
      selectCourt,
      selectCourtLoading,
      selectCourtError
    }
  }