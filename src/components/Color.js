const Color = (props) => {
  const { colorData, setColor } = props

  return (
    <>
      <ul className="colors ps-0">
        {colorData &&
          colorData?.map((item, index) => (
            <li
              key={index}
              style={{ backgroundColor: item?.title }}
              onClick={() => setColor(item?._id)}
            >
              {/* {item?.title} */}
            </li>
          ))}
      </ul>
    </>
  )
}

export default Color
