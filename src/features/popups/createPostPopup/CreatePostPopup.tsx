import Popup from '@/common/ui/popup/Popup'

interface ICreatePostPopup {
  isShowPopup: boolean
  setIsShowPopup: (arg: boolean) => void
}
export const CreatePostPopup = ({ isShowPopup, setIsShowPopup }: ICreatePostPopup) => {
  const closePopup = () => setIsShowPopup(false)
  return (
    <Popup title="Add photo" show={isShowPopup} modalOnClick={closePopup}>
      11111111111111
    </Popup>
  )
}
