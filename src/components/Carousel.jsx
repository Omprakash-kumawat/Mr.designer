import Card from "./Card"

export default function Carousel({ radius = 1.4, count = 8 }) {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2

    return (
      <Card
        key={i}
        url={`/img${(i % 8) + 1}_.jpg`}
        position={[
          Math.sin(angle) * radius,
          0,
          Math.cos(angle) * radius
        ]}
        rotation={[0, Math.PI + angle, 0]}
      />
    )
  })
}