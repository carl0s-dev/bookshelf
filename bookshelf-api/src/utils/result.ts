class Result<Val, Err> {
  private constructor(
    private readonly _ok: boolean,
    private readonly _value?: Val,
    private readonly _error?: Err
  ) {}

  get ok(): boolean {
    return this._ok
  }

  get value(): Val {
    if (!this._ok) {
      throw new Error('Tried to get value from an Err result')
    }
    return this._value as Val
  }

  get error(): Err {
    if (this._ok) {
      throw new Error('Tried to get error from an Ok result')
    }
    return this._error as Err
  }

  static ok<Val, Err = never>(value: Val): Result<Val, Err> {
    return new Result<Val, Err>(true, value)
  }

  static err<Val = never, Err = unknown>(error: Err): Result<Val, Err> {
    return new Result<Val, Err>(false, undefined, error)
  }

  static from<Val>(fn: () => Val): Result<Val, Error> {
    try {
      const value = fn()
      return Result.ok(value)
    } catch (err) {
      return Result.err(err instanceof Error ? err : new Error(String(err)))
    }
  }

  static async fromAsync<Val>(
    fn: () => Promise<Val>
  ): Promise<Result<Val, Error>> {
    try {
      const value = await fn()
      return Result.ok(value)
    } catch (err) {
      return Result.err(err instanceof Error ? err : new Error(String(err)))
    }
  }
}

export { Result }
