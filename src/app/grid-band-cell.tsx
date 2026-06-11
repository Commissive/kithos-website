type GridBandCellVerticesProps = {
  /** Class prefix matching the parent cell (`pseg-scroll` or `stack-band`). */
  prefix: "pseg-scroll" | "stack-band";
};

export function GridBandCellVertices({ prefix }: GridBandCellVerticesProps) {
  return (
    <div className={`${prefix}__vertices`} aria-hidden="true">
      <span className={`${prefix}__vertex ${prefix}__vertex--tl`}>+</span>
      <span className={`${prefix}__vertex ${prefix}__vertex--tr`}>+</span>
      <span className={`${prefix}__vertex ${prefix}__vertex--bl`}>+</span>
      <span className={`${prefix}__vertex ${prefix}__vertex--br`}>+</span>
    </div>
  );
}
