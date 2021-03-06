import Head from 'next/head';
import Layout from '../components/Layout';
import { getMatchingUser, getMyRole } from '../util/database';

export default function Profile(props) {
  return (
    <Layout user={props.user}>
      <Head>
        <title>Pair Up! - My Matches</title>
      </Head>
      <div className="container">
        <h1>
          {props.user.username}, let's see, what fine matches we found for you!
        </h1>
        <p>Feel free to contact each match at your leisure.</p>
        <div class="table-responsive col-lg-9">
          <table class="table">
            <thead>
              <tr>
                <th class="col-3">Username</th>
                <th class="col-5">Email your Matches!</th>
                <th class="col-4">Call your Matches!</th>
              </tr>
            </thead>
            <tbody>
              {props.partnerList.map((match) => {
                return (
                  <tr key={match.id}>
                    <td>{match.username}</td>
                    <td>
                      <a
                        href={`mailto:${match.email}?subject=${props.user.username} from Pair Up wants to dance with you!`}
                      >
                        Send an Email to {match.username}.
                      </a>
                    </td>
                    <td>
                      <a href={`tel:${match.phoneNumber}`}>
                        {match.phoneNumber}
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <br />
        <img src="/oldies.gif" alt="animated old-fashioned dancing couple" />
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { getUserBySessionToken } = await import('../util/database');

  const isValidUser = await getUserBySessionToken(
    context.req.cookies.sessionTokenSignUp,
  );

  if (!isValidUser) {
    return {
      redirect: {
        permanent: false,
        destination: '/login?returnTo=/profile',
      },
    };
  }

  const { getRoles } = await import('../util/database');

  const rolesList = await getRoles();

  const rolesNames = rolesList.map((roles) => ({
    value: roles.id,
    label: roles.name,
  }));

  const myRole = await getMyRole(isValidUser.id);

  const getMatches = await getMatchingUser(myRole[0].roleId);

  return {
    props: {
      rolesList: rolesNames,
      user: isValidUser,
      partnerList: getMatches,
    },
  };
}
