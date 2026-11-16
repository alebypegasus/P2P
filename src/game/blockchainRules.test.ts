import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BLOCKCHAIN_STAGES,
  attemptConnectNodes,
  isStageComplete,
  quarantineCorruptNode,
} from './blockchainRules';

test('Stage 1 completes when all honest peer nodes reach genesis through links', () => {
  let nodes = BLOCKCHAIN_STAGES[0].nodes.map((n) => ({ ...n }));
  let edges: Array<{ from: number; to: number; validated: boolean }> = [];

  // Connect 1 -> 2 first (neither synced yet)
  const r1 = attemptConnectNodes(nodes, edges, 1, 2);
  assert.equal(r1.outcome.accepted, true);
  assert.equal(r1.outcome.newlySyncedIds.length, 0);
  nodes = r1.nodes;
  edges = r1.edges;

  // Now connect 0 (genesis) -> 1, which syncs both 1 and 2 via BFS
  const r2 = attemptConnectNodes(nodes, edges, 0, 1);
  assert.equal(r2.outcome.accepted, true);
  assert.deepEqual(r2.outcome.newlySyncedIds.sort(), [1, 2]);
  nodes = r2.nodes;
  edges = r2.edges;

  // Connect 0 -> 3 and 3 -> 4
  const r3 = attemptConnectNodes(nodes, edges, 0, 3);
  nodes = r3.nodes;
  edges = r3.edges;
  const r4 = attemptConnectNodes(nodes, edges, 3, 4);
  assert.equal(r4.outcome.consensusReached, true);
  assert.equal(isStageComplete(r4.nodes), true);
});

test('Connecting to a corrupt node is rejected with penalty', () => {
  const nodes = BLOCKCHAIN_STAGES[1].nodes.map((n) => ({ ...n }));
  const res = attemptConnectNodes(nodes, [], 0, 6);
  assert.equal(res.outcome.accepted, false);
  assert.equal(res.outcome.reason, 'corrupt-link-blocked');
  assert.equal(res.outcome.scoreDelta, -25);
});

test('Quarantining a corrupt node succeeds and contributes to stage completion', () => {
  let nodes = BLOCKCHAIN_STAGES[1].nodes.map((n) => ({ ...n }));
  let edges: Array<{ from: number; to: number; validated: boolean }> = [];
  for (const peerId of [1, 2, 3, 4, 5]) {
    const step = attemptConnectNodes(nodes, edges, 0, peerId);
    nodes = step.nodes;
    edges = step.edges;
  }
  assert.equal(isStageComplete(nodes), false);
  const q = quarantineCorruptNode(nodes, 6);
  assert.equal(q.accepted, true);
  assert.equal(q.consensusReached, true);
});
