import serial
import time
import json

class IoTGateway:
    def __init__(self, port='/dev/ttyUSB0', baudrate=115200, timeout=1):
        """
        Initialize Serial connection with Yolo:Bit.
        Note: Change 'port' (e.g., 'COM3' on Windows) to match your physical device.
        """
        self.port = port
        self.baudrate = baudrate
        self.timeout = timeout
        self.serial_conn = None

    def connect(self):
        try:
            self.serial_conn = serial.Serial(self.port, self.baudrate, timeout=self.timeout)
            print(f"Successfully connected to Yolo:Bit on port {self.port}.")
            time.sleep(2) # Wait for Yolo:Bit to boot up after opening the port
            return True
        except serial.SerialException as e:
            print(f"Serial connection error: {e}")
            return False

    def read_sensor_data(self):
        """
        Read data from Yolo:Bit. 
        Expected JSON format: {"temperature": 29.6, "humidity": 49, "soil": 30, "distance": 1.17, "gesture_id": 1}
        """
        if self.serial_conn and self.serial_conn.in_waiting > 0:
            try:
                line = self.serial_conn.readline().decode('utf-8').strip()
                if line:
                    data = json.loads(line)
                    return data
            except json.JSONDecodeError:
                print(f"JSON parsing error from string: {line}")
            except UnicodeDecodeError:
                print("Character decoding error (UnicodeDecodeError).")
            except Exception as e:
                print(f"Unknown error while reading data: {e}")
        return None

    def send_command(self, target_device, action_state):
        """
        Send control command to Yolo:Bit.
        Expected JSON format: {"device": "fan", "state": "ON"}
        """
        if self.serial_conn and self.serial_conn.is_open:
            command_dict = {"device": target_device, "state": action_state}
            command_str = json.dumps(command_dict) + '\n'
            
            try:
                self.serial_conn.write(command_str.encode('utf-8'))
                print(f"Command sent: {command_str.strip()}")
                return True
            except Exception as e:
                print(f"Error sending control command: {e}")
        else:
            print("Serial not connected. Cannot send command.")
        return False

    def disconnect(self):
        if self.serial_conn and self.serial_conn.is_open:
            self.serial_conn.close()
            print("Serial connection closed.")

# Direct execution test
if __name__ == "__main__":
    gateway = IoTGateway(port='COM3') # Replace with actual port
    if gateway.connect():
        try:
            while True:
                # Read data
                sensor_data = gateway.read_sensor_data()
                if sensor_data:
                    print(f"Received data: {sensor_data}")
                    
                    # Module 2: Threshold monitoring logic (Sample)
                    if sensor_data.get("temperature", 0) > 28.0 and sensor_data.get("distance", 100) < 50:
                        gateway.send_command("fan", "ON")
                        
                time.sleep(1)
        except KeyboardInterrupt:
            gateway.disconnect()