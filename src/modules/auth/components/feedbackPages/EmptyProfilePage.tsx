import Feedback from '@/common/ui/feedback/Feedback'

export const EmptyProfilePage = () => {
  return (
    <Feedback
      title="Oops! This place looks empty"
      info="You do not have an account to create one, click below and then fill in all the fields"
      actionBtnTitle="Create Account"
    />
  )
}
