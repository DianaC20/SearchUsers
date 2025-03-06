import { useRouter } from 'next/router';

export default function UserDetail({ user }) {
  const router = useRouter();
  const { username } = router.query;

  if (!user) {
    return <div>Loading...</div>;
  }

return (
    <div>
        <h1 className='ass'>{user.login}</h1>
        <img src={user.avatar_url} alt={user.login} width="100" />
        <p>Name: {user.name || 'N/A'}</p>
        <p>Location: {user.location || 'N/A'}</p>
        <p>Followers: {user.followers}</p>
        <p>Following: {user.following}</p>
        <p>Public Repos: {user.public_repos}</p>
    </div>
);
}

export async function getServerSideProps({ params }) {
  const res = await fetch(`https://api.github.com/users/${params.username}`);
  const user = await res.json();
  return {
    props: {
      user,
    },
  };
}