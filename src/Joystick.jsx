import { EcctrlJoystick } from "ecctrl"

export default function Joystick() {
  return (
    <EcctrlJoystick
      buttonGroup1Position={{ bottom: 20, left: 20 }}
      buttonGroup2Position={{ bottom: 20, right: 20 }}
    />
  )
}