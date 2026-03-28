import unittest
from unittest.mock import patch, MagicMock
import json
from gateway_serial import IoTGateway

class TestIoTGateway(unittest.TestCase):

    @patch('serial.Serial')
    def setUp(self, mock_serial):
        """Initialize Gateway and mock Serial object before each test"""
        self.gateway = IoTGateway(port='COM_TEST')
        self.gateway.connect()
        # Get instance of Mock Serial to configure return behavior
        self.mock_serial_instance = self.gateway.serial_conn

    def test_read_sensor_data_success(self):
        """Test successful reading and parsing of JSON"""
        # Simulate data available in the buffer
        self.mock_serial_instance.in_waiting = 1
        
        # Simulate data sent by Yolo:Bit (sample data from Module 1)
        mock_payload = '{"temperature": 29.6, "humidity": 49, "soil": 30, "distance": 1.17, "gesture_id": 1}\n'
        self.mock_serial_instance.readline.return_value = mock_payload.encode('utf-8')
        
        data = self.gateway.read_sensor_data()
        
        self.assertIsNotNone(data)
        self.assertEqual(data["temperature"], 29.6)
        self.assertEqual(data["gesture_id"], 1)

    def test_read_sensor_data_invalid_json(self):
        """Test the case where Yolo:Bit sends a garbage string, not JSON"""
        self.mock_serial_instance.in_waiting = 1
        self.mock_serial_instance.readline.return_value = b'Raw text string not json\n'
        
        data = self.gateway.read_sensor_data()
        self.assertIsNone(data)

    def test_send_command_success(self):
        """Test sending device control command (Module 3)"""
        self.mock_serial_instance.is_open = True
        
        # Call function to send 'turn on fan' command
        success = self.gateway.send_command("fan", "ON")
        
        self.assertTrue(success)
        # Check if the write function was called with the correct JSON format
        expected_bytes = b'{"device": "fan", "state": "ON"}\n'
        self.mock_serial_instance.write.assert_called_with(expected_bytes)

if __name__ == '__main__':
    unittest.main()