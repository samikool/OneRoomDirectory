import React from 'react'
const config = require('./constants').config()


class app extends React.Component {

  constructor(props) {
    super(props);
    this.state = {links: []}
  }

  async getLinks(){
    
    let res = await fetch(config.url.API_URL + '/getlinks', {
    method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    res = await res.json()
    this.setState({links: res})
    return res;
  }

  renderTableRow(link){
      return(
        <tr>
          <td>
            <a href={'https://'+link.link}><span>{link.link}</span></a>  
          </td>
          <td>
            {link.description}
          </td>
        </tr>
      )
  }

  componentDidMount(){
    this.getLinks()
  }

  render(){

    console.log(this.state.links)
    //console.log(this.state.map())

    // const links = this.state.links.map( (link) => {
    //   console.log(link)
    // })

    return (
      <table>
        <tbody>
          <tr>
            <th>
              Link
            </th>
            <th>
              Description
            </th>
          </tr>
          {Object.keys(this.state.links).map( (index) => {
              let link = this.state.links[index]
              return this.renderTableRow(link)
            })
          }
        </tbody>
      </table>
    );
  }  
}

export default app;