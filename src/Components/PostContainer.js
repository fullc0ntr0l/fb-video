import React from 'react';
import momentjs from 'moment';
import { Row, Col } from 'react-flexbox-grid';


export default ({ children, avatar, name, updated }) => {
  let last_updated;
  if (updated) {
    const end = momentjs(new Date())
    last_updated = momentjs.duration(end.diff(updated));

    if (last_updated.asHours() >= 1) {
      last_updated = last_updated.asHours()
      last_updated = `${Math.floor(last_updated)} h`;
    } else {
      last_updated = last_updated.asMinutes()
      last_updated = `${Math.floor(last_updated)} min`;
    }
  }

  return (
    <Row
      start="xs"
      className="post-container"
    >
      <Col xs>
        <Row>
          <Col>
            <img
              src={avatar}
              className="profile-avatar"
              alt="Avatar"
            />
          </Col>
          <Col
            className="post-metadata"
            xs
          >
            <Row className="post-creator">
              {name}
            </Row>
            <Row className="post-updated">
              {last_updated}
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs>
            {children}
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
