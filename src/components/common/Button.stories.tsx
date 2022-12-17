import { ComponentMeta, ComponentStory } from '@storybook/react'
import Button from './Button'

export default {
  title: 'Sellbox/Button',
  component: Button,
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  children: 'button',
}

export const Secondary = Template.bind({})
Secondary.args = {
  children: 'button',
  primary: false,
}
