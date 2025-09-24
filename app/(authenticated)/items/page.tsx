import { getCurrentInternalUser } from '@/lib/services/user-services'

const Page = async () => {
  const user = await getCurrentInternalUser()

  console.log(user)

  return (
    <div>
      page
    </div>
  )
}

export default Page
