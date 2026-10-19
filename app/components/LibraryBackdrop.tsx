/** Decorative desktop scenery, rendered identically on server and client. */
export default function LibraryBackdrop() {
  return <div className="library-backdrop" aria-hidden="true">
    <div className="library-backdrop__light library-backdrop__light--left" />
    <div className="library-backdrop__light library-backdrop__light--right" />
    <div className="library-backdrop__grain" />
    <svg className="library-backdrop__pages" viewBox="0 0 240 430" fill="none">
      <path d="m29 57 140-19 35 290-140 20Z" fill="currentColor" fillOpacity=".025" stroke="currentColor" />
      <path d="m44 39 140-12 25 294-140 12Z" fill="currentColor" fillOpacity=".035" stroke="currentColor" />
      <path d="M61 19h140v295H61z" fill="currentColor" fillOpacity=".04" stroke="currentColor" />
      <path d="M77 36h108v261H77z" stroke="currentColor" strokeOpacity=".5" />
      <path d="M115 68h32m-16-7v14" stroke="currentColor" />
      {[99, 114, 129, 144, 172, 187, 202, 217, 245, 260].map((y, i) =>
        <path key={y} d={`M94 ${y}h${i === 3 || i === 7 ? 48 : 74}`} stroke="currentColor" strokeOpacity=".6" />,
      )}
      <path d="m92 367 26 17 26-17m-26-9v35" stroke="currentColor" strokeOpacity=".6" />
    </svg>
    <svg className="library-backdrop__feather" viewBox="0 0 180 400" fill="none">
      <path d="M38 357C53 265 66 154 141 36c18 62 8 126-15 171-17 35-42 62-69 71" fill="currentColor" fillOpacity=".035" stroke="currentColor" strokeWidth="1.5" />
      <path d="M38 357 137 51M71 251l-9-58m20 24-6-61m17 26-3-61m15 26 2-55m-34 155 38-24m-27-12 44-31m-33-6 46-36m-33 0 37-35" stroke="currentColor" strokeWidth="1.2" />
      <path d="M20 375h58m-46 8h34M41 367v24" stroke="currentColor" strokeOpacity=".5" />
    </svg>
    <div className="library-backdrop__motes">
      {Array.from({ length: 10 }, (_, index) => <i key={index} />)}
    </div>
  </div>;
}
