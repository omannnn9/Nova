/**
 * "The Assembly" geometry from the brand pack: 100-unit square, 22u stems, 6u gap,
 * 12.4° diagonal (a 22u horizontal run over 100u height).
 */
export const MARK_PARTS = {
  left: { x: 0, y: 0, width: 22, height: 100 },
  right: { x: 78, y: 0, width: 22, height: 100 },
  diagonal: '28,0 50,0 72,100 50,100'
} as const;
