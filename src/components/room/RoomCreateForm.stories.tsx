import { ComponentMeta, ComponentStory } from '@storybook/react'
import RoomCreateForm from './RoomCreateForm'
import React from 'react'

export default {
  title: 'Sellbox/RoomCreateForm',
  component: RoomCreateForm,
} as ComponentMeta<typeof RoomCreateForm>

const Template: ComponentStory<typeof RoomCreateForm> = (args) => (
  <RoomCreateForm {...args} />
)

export const Example = Template.bind({})
Example.args = {}
