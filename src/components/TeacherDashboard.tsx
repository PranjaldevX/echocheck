import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Radio, 
  Settings, 
  Download, 
  Users, 
  Clock, 
  MapPin, 
  Play,
  BarChart3,
  FileSpreadsheet,
  Bell,
  CheckCircle,
  AlertTriangle,
  TrendingUp
} from "lucide-react";

interface TeacherDashboardProps {
  onLogout: () => void;
}

export const TeacherDashboard = ({ onLogout }: TeacherDashboardProps) => {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [location, setLocation] = useState("Room 204");
  const [timeWindow, setTimeWindow] = useState("5");

  const subjects = [
    "Computer Science",
    "Mathematics", 
    "Physics",
    "Chemistry",
    "Biology"
  ];

  const classes = [
    "CS-301A",
    "CS-301B", 
    "MATH-201",
    "PHY-101",
    "CHEM-202"
  ];

  const handleStartSession = () => {
    if (selectedSubject && selectedClass) {
      setIsSessionActive(true);
      // Here you would implement the ultrasonic tone generation
      console.log("Starting ultrasonic session...");
    }
  };

  const handleStopSession = () => {
    setIsSessionActive(false);
    console.log("Session stopped");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-primary/5">
      {/* Header */}
      <header className="bg-card border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-primary to-primary-glow rounded-lg">
                <Radio className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">EchoMark</h1>
                <Badge variant="secondary" className="text-xs">Teacher</Badge>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <Button variant="outline" onClick={onLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Start Session */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-success/10 rounded-lg">
                    <Play className="h-5 w-5 text-success" />
                  </div>
                  <CardTitle className="text-lg">Start Session</CardTitle>
                </div>
                <CardDescription>Begin ultrasonic attendance session</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant={isSessionActive ? "destructive" : "success"} 
                  className="w-full"
                  onClick={isSessionActive ? handleStopSession : handleStartSession}
                  disabled={!selectedSubject || !selectedClass}
                >
                  <Radio className="h-4 w-4" />
                  {isSessionActive ? "Stop Broadcasting" : "Start Broadcasting"}
                </Button>
              </CardContent>
            </Card>

            {/* Manage Classes */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Settings className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Manage Classes</CardTitle>
                </div>
                <CardDescription>Add/edit subjects and class info</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  <Settings className="h-4 w-4" />
                  Manage
                </Button>
              </CardContent>
            </Card>

            {/* Export Data */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-warning/10 rounded-lg">
                    <Download className="h-5 w-5 text-warning" />
                  </div>
                  <CardTitle className="text-lg">Export Data</CardTitle>
                </div>
                <CardDescription>Download attendance logs</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  <FileSpreadsheet className="h-4 w-4" />
                  Export Excel
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Session Configuration */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Session Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Subject
                </Label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Class</Label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((cls) => (
                      <SelectItem key={cls} value={cls}>
                        {cls}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location
                </Label>
                <Input 
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Room number" 
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Time Window
                </Label>
                <Select value={timeWindow} onValueChange={setTimeWindow}>
                  <SelectTrigger>
                    <SelectValue placeholder="5 minutes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 minutes</SelectItem>
                    <SelectItem value="5">5 minutes</SelectItem>
                    <SelectItem value="10">10 minutes</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analytics Overview */}
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">Analytics Overview</CardTitle>
            <Button variant="outline" size="sm">
              <BarChart3 className="h-4 w-4" />
              Filter
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              
              <div className="text-center p-4 bg-success/5 rounded-lg border border-success/20">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-success" />
                  <span className="text-2xl font-bold text-success">128</span>
                </div>
                <p className="text-sm text-muted-foreground">Total Students</p>
              </div>

              <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="text-2xl font-bold text-primary">87%</span>
                </div>
                <p className="text-sm text-muted-foreground">Avg Attendance</p>
              </div>

              <div className="text-center p-4 bg-warning/5 rounded-lg border border-warning/20">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Radio className="h-5 w-5 text-warning" />
                  <span className="text-2xl font-bold text-warning">0</span>
                </div>
                <p className="text-sm text-muted-foreground">Active Sessions</p>
              </div>

              <div className="text-center p-4 bg-success/5 rounded-lg border border-success/20">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-success" />
                  <span className="text-2xl font-bold text-success">+5%</span>
                </div>
                <p className="text-sm text-muted-foreground">Weekly Trend</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};