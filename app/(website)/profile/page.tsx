import CardProfile from "./card-profile";

export default async function Profile(){
  return(
    <section>
      <h1 className="text-2xl">Your Profile</h1>
      <p className="font-medium mb-6">Manage your personal information and preferences</p>

      <div>
        <CardProfile />
      </div>
    </section>
  )
}