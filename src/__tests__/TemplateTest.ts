import Template from "../Template"

describe('Template', (): void => {
  it('can render readme', async () => {
    const text = await Template.readme('to play music')
    expect(text).toMatchSnapshot()
  })
})
