import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

const publicContext: TrpcContext = {
  user: null,
  req: { protocol: "http", headers: {} } as TrpcContext["req"],
  res: {} as TrpcContext["res"],
};

describe("Willow AI feature contracts", () => {
  it("returns a signed human-verification challenge", async () => {
    const challenge = await appRouter.createCaller(publicContext).auth.challenge();
    expect(challenge.prompt).toMatch(/^\d+ \+ \d+ = \?$/);
    expect(challenge.token).toMatch(/^[A-Za-z0-9_-]+$/);
  });

  it("returns timestamped market data even when the live provider is not configured", async () => {
    const result = await appRouter.createCaller(publicContext).market.live();
    expect(result.updatedAt).toEqual(expect.any(String));
    expect(result.quotes.length).toBeGreaterThan(0);
    expect(["simulated", "unconfigured", "indianapi", "upstox", "fallback"]).toContain(result.provider);
  });
});
