import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getSingleMatterData } from "../getSingleMatterData/getSingleMattersDataActions"
import { selectDataSingleMatterChildrenData, selectDataSingleMatterChildrenError, selectDataSingleMatterChildrenLoading } from "../getSingleMatterData/getSingleMattersDataSelectors"
import { calculateAge } from "../../../matterValidations/matterValidation"


export function ChildrenData (matterId) {
    const dispatch = useDispatch()
    useEffect(() => {
      const fetchData = async () => {
        await dispatch(getSingleMatterData(matterId, 'children'))
      }
      fetchData()
    }, [])
  
    const selectChildrenData = useSelector(selectDataSingleMatterChildrenData)
    const selectChildrenDataLoading = useSelector(
      selectDataSingleMatterChildrenLoading
    )
    const selectChildrenDataError = useSelector(
      selectDataSingleMatterChildrenError
    )
  
    return {
      selectChildrenData,
      selectChildrenDataLoading,
      selectChildrenDataError
    }
  }


  export function TheChildren(data){

      let childrenData = []
  
      if (data) {
        childrenData = data.map(child => ({
          fullLegalName: child.childName,
          age: calculateAge(child.dateOfBirth),
          birthdate: child.dateOfBirth,
          muncipilityAndProvince: '', // Add the relevant data if available
          nowLivingWith: child.nowLivesWith
        }))
      } else {
        childrenData = [
          {
            fullLegalName: '',
            age: '',
            birthdate: '',
            muncipilityAndProvince: '', // Add the relevant data if available
            nowLivingWith: ''
          },
          {
            fullLegalName: '',
            age: '',
            birthdate: '',
            muncipilityAndProvince: '', // Add the relevant data if available
            nowLivingWith: ''
          },
          {
            fullLegalName: '',
            age: '',
            birthdate: '',
            muncipilityAndProvince: '', // Add the relevant data if available
            nowLivingWith: ''
          }
        ]
      }
      
      return {
        childrenData
      }

  }