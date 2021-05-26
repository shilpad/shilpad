import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { useQuery, gql } from '@apollo/client'
import Title from './Title'

const GET_PERSON_QUERY = gql`
  {
    Person {
      name
      address
      longitude
      latitude
      can_teach {
        topic
      }
      friend {
        name
      }
    }
  }
`

export default function RecentReviews() {
  const { loading, error, data } = useQuery(GET_PERSON_QUERY)
  if (error) return <p>Error</p>
  if (loading) return <p>Loading</p>

  return (
    <React.Fragment>
      <Title>Recent Reviews</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Person</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Interest</TableCell>
            <TableCell>Friend</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.Person.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>{row.can_teach.topic}</TableCell>
              <TableCell>{row.friend.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  )
}

// query Interest(
//   $topic: String
// ) {Interest(topic:$topic) {
//   topic
// }
// }
