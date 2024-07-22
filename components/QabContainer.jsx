import React from 'react'

const QabContainer = () => {
  return (
    <div
      id="qab_container"
      style={{
        transition: 'height 0ms linear 300ms',
        display: 'block',
        color: 'inherit',
        height: '45px',
      }}
    >
      <div
        id="qab_background"
        style={{
          opacity: 1,
          margin: '0px',
          padding: '0px',
          left: '0px',
          height: 'auto',
          width: '100%',
          zIndex: 299,
          position: 'fixed',
          overflow: 'hidden',
          top: '0px',
        }}
      >
        <div
          id="qab_bar"
          style={{
            textAlign: 'center',
            margin: '0px',
            padding: '10px 0px',
            left: '0px',
            height: 'auto',
            width: '100%',
            boxSizing: 'border-box',
            border: 'none',
            backgroundColor: 'rgb(22, 135, 223)',
            color: 'rgb(15, 19, 8)',
            fontSize: '20px',
            lineHeight: '25px',
            fontFamily: 'Josefin Sans',
          }}
        >
          <div
            id="qab_content"
            style={{
              textAlign: 'center',
              display: 'inline-block',
              width: '100%',
              fontSize: '20px',
            }}
          >
            <span
              id="qab_message"
              style={{ color: 'inherit', fontSize: '20px' }}
            >
              "LOWEST PRICE GUARANTEED" compare to all other Marketplace - All
              prices are inclusive of GST
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QabContainer
